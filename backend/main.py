from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

summarizer = pipeline(
    "summarization",
    model="facebook/bart-large-cnn"
)

class SummaryRequest(BaseModel):
    text: str
    length: str  # short | medium | long

@app.post("/summarize")
def summarize(req: SummaryRequest):
    if len(req.text.strip()) < 50:
        raise HTTPException(status_code=400, detail="Text too short")

    length_settings = {
        "short": {"max": 50, "min": 20},
        "medium": {"max": 100, "min": 40},
        "long": {"max": 180, "min": 80}
    }

    settings = length_settings.get(req.length, length_settings["medium"])

    summary = summarizer(
        req.text,
        max_length=settings["max"],
        min_length=settings["min"],
        do_sample=False
    )

    return {
        "summary": summary[0]["summary_text"]
    }
