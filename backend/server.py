from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict, BeforeValidator
from typing import List, Optional, Annotated
from bson import ObjectId
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="iStore API")
api_router = APIRouter(prefix="/api")


# ----------------- Helpers / Base Models -----------------
PyObjectId = Annotated[str, BeforeValidator(str)]


def now_iso():
    return datetime.now(timezone.utc).isoformat()


# ----------------- Models -----------------
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    name: str
    price: float
    old_price: Optional[float] = None
    badge: str
    tagline: str
    storage: str
    color: str
    image: str
    installment: str
    highlights: List[str] = []
    order: int = 0


class CartItem(BaseModel):
    product_id: str
    name: str
    price: float
    quantity: int = 1
    image: Optional[str] = None


class OrderCreate(BaseModel):
    items: List[CartItem]
    customer_name: Optional[str] = None
    customer_email: Optional[str] = None


class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    items: List[CartItem]
    total: float
    customer_name: Optional[str] = None
    customer_email: Optional[str] = None
    status: str = "pending"
    created_at: str = Field(default_factory=now_iso)


class NewsletterCreate(BaseModel):
    email: EmailStr


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


# ----------------- Seed data -----------------
SEED_PRODUCTS = [
    {
        "slug": "iphone-17", "name": "iPhone 17", "price": 2499.90, "old_price": 2999.90,
        "badge": "Lançamento", "tagline": "O futuro na palma da mão.", "storage": "256GB",
        "color": "Titânio Natural",
        "image": "https://images.unsplash.com/photo-1740721610016-ce8577141b78?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxsYXRlc3QlMjBpcGhvbmUlMjBpc29sYXRlZCUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3ODU4MTg1Njl8MA&ixlib=rb-4.1.0&q=85",
        "installment": "ou 12x de R$ 208,32 sem juros",
        "highlights": ["Chip A19 Pro", "Câmera 48MP", "Tela ProMotion 120Hz"], "order": 1,
    },
    {
        "slug": "iphone-16", "name": "iPhone 16", "price": 1877.90, "old_price": 2199.90,
        "badge": "Mais vendido", "tagline": "Potência que impressiona.", "storage": "128GB",
        "color": "Ultramarino",
        "image": "https://images.unsplash.com/photo-1740721610016-ce8577141b78?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxsYXRlc3QlMjBpcGhvbmUlMjBpc29sYXRlZCUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3ODU4MTg1Njl8MA&ixlib=rb-4.1.0&q=85",
        "installment": "ou 12x de R$ 156,49 sem juros",
        "highlights": ["Chip A18", "Câmera 48MP", "Botão de Ação"], "order": 2,
    },
    {
        "slug": "iphone-15", "name": "iPhone 15", "price": 1244.90, "old_price": 1599.90,
        "badge": "Oferta", "tagline": "Design icônico, preço incrível.", "storage": "128GB",
        "color": "Rosa",
        "image": "https://images.unsplash.com/photo-1616410011236-7a42121dd981?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxsYXRlc3QlMjBpcGhvbmUlMjBpc29sYXRlZCUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3ODU4MTg1Njl8MA&ixlib=rb-4.1.0&q=85",
        "installment": "ou 12x de R$ 103,74 sem juros",
        "highlights": ["Dynamic Island", "USB-C", "Câmera 48MP"], "order": 3,
    },
    {
        "slug": "iphone-14", "name": "iPhone 14", "price": 722.90, "old_price": 999.90,
        "badge": "Ótimo custo-benefício", "tagline": "Confiável e elegante.", "storage": "128GB",
        "color": "Meia-noite",
        "image": "https://images.unsplash.com/photo-1616410011236-7a42121dd981?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxsYXRlc3QlMjBpcGhvbmUlMjBpc29sYXRlZCUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3ODU4MTg1Njl8MA&ixlib=rb-4.1.0&q=85",
        "installment": "ou 12x de R$ 60,24 sem juros",
        "highlights": ["Chip A15 Bionic", "Câmera dupla", "Detecção de Acidente"], "order": 4,
    },
    {
        "slug": "iphone-13", "name": "iPhone 13", "price": 421.90, "old_price": 699.90,
        "badge": "Promoção", "tagline": "O queridinho continua imbatível.", "storage": "128GB",
        "color": "Estelar",
        "image": "https://images.unsplash.com/photo-1616410011236-7a42121dd981?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxsYXRlc3QlMjBpcGhvbmUlMjBpc29sYXRlZCUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3ODU4MTg1Njl8MA&ixlib=rb-4.1.0&q=85",
        "installment": "ou 12x de R$ 35,15 sem juros",
        "highlights": ["Chip A15 Bionic", "Modo Cinema", "Tela Super Retina XDR"], "order": 5,
    },
    {
        "slug": "iphone-12", "name": "iPhone 12", "price": 99.90, "old_price": 499.90,
        "badge": "Liquidação", "tagline": "Última chance por esse preço.", "storage": "64GB",
        "color": "Azul",
        "image": "https://images.unsplash.com/photo-1616410011236-7a42121dd981?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxsYXRlc3QlMjBpcGhvbmUlMjBpc29sYXRlZCUyMHdoaXRlJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3ODU4MTg1Njl8MA&ixlib=rb-4.1.0&q=85",
        "installment": "ou 12x de R$ 8,32 sem juros",
        "highlights": ["Chip A14 Bionic", "5G", "Ceramic Shield"], "order": 6,
    },
]


@app.on_event("startup")
async def seed_products():
    count = await db.products.count_documents({})
    if count == 0:
        docs = [Product(**p).model_dump() for p in SEED_PRODUCTS]
        await db.products.insert_many(docs)
        logger.info("Seeded %d products", len(docs))


# ----------------- Routes -----------------
@api_router.get("/")
async def root():
    return {"message": "iStore API online"}


@api_router.get("/products", response_model=List[Product])
async def get_products():
    products = await db.products.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return products


@api_router.get("/products/{slug}", response_model=Product)
async def get_product(slug: str):
    product = await db.products.find_one({"slug": slug}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return product


@api_router.post("/orders", response_model=Order)
async def create_order(payload: OrderCreate):
    if not payload.items:
        raise HTTPException(status_code=400, detail="O carrinho está vazio")
    total = round(sum(i.price * i.quantity for i in payload.items), 2)
    order = Order(
        items=payload.items,
        total=total,
        customer_name=payload.customer_name,
        customer_email=payload.customer_email,
    )
    await db.orders.insert_one(order.model_dump())
    return order


@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    return order


@api_router.post("/newsletter")
async def subscribe_newsletter(payload: NewsletterCreate):
    existing = await db.newsletter.find_one({"email": payload.email})
    if existing:
        return {"message": "Você já está inscrito!", "already": True}
    await db.newsletter.insert_one({
        "id": str(uuid.uuid4()),
        "email": payload.email,
        "created_at": now_iso(),
    })
    return {"message": "Inscrição realizada com sucesso!", "already": False}


@api_router.post("/contact")
async def create_contact(payload: ContactCreate):
    await db.contacts.insert_one({
        "id": str(uuid.uuid4()),
        "name": payload.name,
        "email": payload.email,
        "message": payload.message,
        "created_at": now_iso(),
    })
    return {"message": "Mensagem enviada! Em breve entraremos em contato."}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
