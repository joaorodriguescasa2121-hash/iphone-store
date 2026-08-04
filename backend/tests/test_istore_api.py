"""iStore backend regression tests after dependency changes."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://iphone-store-49.preview.emergentagent.com").rstrip("/")


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_root(client):
    r = client.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert "iStore" in r.json().get("message", "")


def test_get_products(client):
    r = client.get(f"{BASE_URL}/api/products")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 6
    slugs = [p["slug"] for p in data]
    for s in ["iphone-17", "iphone-16", "iphone-15", "iphone-14", "iphone-13", "iphone-12"]:
        assert s in slugs
    # Validate required fields
    p = data[0]
    for f in ["id", "slug", "name", "price", "badge", "installment", "image"]:
        assert f in p
    # order sorted asc
    orders = [p["order"] for p in data]
    assert orders == sorted(orders)


def test_get_product_by_slug(client):
    r = client.get(f"{BASE_URL}/api/products/iphone-17")
    assert r.status_code == 200
    d = r.json()
    assert d["slug"] == "iphone-17"
    assert d["name"] == "iPhone 17"
    assert d["image"] == "/products/iphone-17.jpg"


def test_get_product_404(client):
    r = client.get(f"{BASE_URL}/api/products/nonexistent")
    assert r.status_code == 404


def test_create_order(client):
    payload = {
        "items": [
            {"product_id": "p1", "name": "iPhone 17", "price": 2499.90, "quantity": 2, "image": "/products/iphone-17.jpg"}
        ],
        "customer_name": "TEST_User",
        "customer_email": "test_user@example.com",
    }
    r = client.post(f"{BASE_URL}/api/orders", json=payload)
    assert r.status_code == 200
    d = r.json()
    assert d["total"] == round(2499.90 * 2, 2)
    assert d["status"] == "pending"
    assert "id" in d
    # Verify persistence
    r2 = client.get(f"{BASE_URL}/api/orders/{d['id']}")
    assert r2.status_code == 200
    assert r2.json()["id"] == d["id"]


def test_create_order_empty(client):
    r = client.post(f"{BASE_URL}/api/orders", json={"items": []})
    assert r.status_code == 400


def test_newsletter(client):
    import uuid
    email = f"test_{uuid.uuid4().hex[:8]}@example.com"
    r = client.post(f"{BASE_URL}/api/newsletter", json={"email": email})
    assert r.status_code == 200
    d = r.json()
    assert d["already"] is False
    # Duplicate
    r2 = client.post(f"{BASE_URL}/api/newsletter", json={"email": email})
    assert r2.status_code == 200
    assert r2.json()["already"] is True


def test_newsletter_invalid_email(client):
    r = client.post(f"{BASE_URL}/api/newsletter", json={"email": "not-an-email"})
    assert r.status_code == 422
