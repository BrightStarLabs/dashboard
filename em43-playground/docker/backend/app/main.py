from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import uuid, random, datetime

app = FastAPI(title="EM43 Playground API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

tasks = {}
submissions = {}

@app.get("/tasks")
def list_tasks():
    return [
        {
            "taskId": k,
            "title": v["title"],
            "description": v["description"],
            "bestFitness": v["bestFitness"],
        }
        for k, v in tasks.items()
    ]


@app.post("/tasks")
def create_task(payload: dict):
    task_id = str(uuid.uuid4())
    tasks[task_id] = {
        "title": payload.get("title", "Untitled"),
        "description": payload.get("description", ""),
        "train": payload.get("train", ""),
        "val": payload.get("val", ""),
        "bestFitness": 1e9,
    }
    submissions[task_id] = []
    return {"taskId": task_id}


@app.get("/tasks/{task_id}")
def get_task(task_id: str):
    task = tasks.get(task_id)
    if not task:
        return {"error": "Not found"}
    leaderboard = sorted(submissions[task_id], key=lambda x: x["fitness"])
    return {
        "taskId": task_id,
        "title": task["title"],
        "description": task["description"],
        "bestFitness": task["bestFitness"],
        "leaderboard": leaderboard,
    }


@app.post("/tasks/{task_id}/submit")
async def submit_model(
    task_id: str, model: UploadFile = File(...), notes: str = Form("")
):
    if task_id not in tasks:
        return {"error": "Task not found"}
    # Dummy validation: random fitness
    fitness = round(random.uniform(0, 1), 6)
    submission = {
        "submittedAt": datetime.datetime.utcnow().isoformat() + "Z",
        "fitness": fitness,
        "notes": notes,
    }
    submissions[task_id].append(submission)
    if fitness < tasks[task_id]["bestFitness"]:
        tasks[task_id]["bestFitness"] = fitness
    return {"ok": True, "fitness": fitness}
