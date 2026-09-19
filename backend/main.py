import os
from datetime import datetime, timedelta
from typing import Optional
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="GELINGEN Water Quality API")

# Enable CORS for all ports (allows communication with frontend dev servers)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global simulation state
simulation_state = {
    "inject_contamination": False,
    "inject_hardware_fault": False
}

class UserLogin(BaseModel):
    username: str
    password: str

class SimulationConfig(BaseModel):
    inject_contamination: Optional[bool] = False
    inject_hardware_fault: Optional[bool] = False

# -------------------------------------------------------------------
# Auth Endpoint
# -------------------------------------------------------------------
@app.post("/api/login")
def login(user: UserLogin):
    username = user.username.strip() if user.username else ""
    password = user.password.strip() if user.password else ""

    if username == "admin" and password == "password123":
        return {
            "token": "mock-jwt-token-12345",
            "access_token": "mock-jwt-token-12345",
            "token_type": "bearer",
            "username": username
        }
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid username or password"
    )

# -------------------------------------------------------------------
# Dashboard Data Endpoint
# -------------------------------------------------------------------
@app.get("/api/dashboard/summary")
def get_dashboard_summary():
    contam = simulation_state["inject_contamination"]
    fault = simulation_state["inject_hardware_fault"]

    # Dynamic metrics calculation based on simulation flags
    ph = 5.2 if contam else 7.4
    turbidity = 18.5 if contam else 2.1
    tds = 620.0 if contam else 180.0

    status_str = "Fault" if fault else ("Alert" if contam else "Normal")

    # Time-series history generation
    history = []
    now = datetime.now()
    for i in range(10, 0, -1):
        t = (now - timedelta(minutes=i*5)).strftime("%I:%M:%S %p")
        history.append({
            "time": t,
            "ph": 5.2 if contam else round(7.2 + (i * 0.02), 2),
            "turbidity": 18.5 if contam else round(2.0 + (i * 0.1), 2),
            "tds": 620 if contam else 175 + i
        })

    return {
        "latest": {
            "timestamp": datetime.now().isoformat(),
            "ph": ph,
            "turbidity": turbidity,
            "tds": tds,
            "status": status_str
        },
        "history": history,
        "contamination": contam,
        "hardware_fault": fault
    }

# -------------------------------------------------------------------
# Simulation Config Endpoint
# -------------------------------------------------------------------
@app.post("/api/simulation/config")
def update_simulation_config(config: SimulationConfig):
    if config.inject_contamination is not None:
        simulation_state["inject_contamination"] = config.inject_contamination
    if config.inject_hardware_fault is not None:
        simulation_state["inject_hardware_fault"] = config.inject_hardware_fault
        
    return {
        "message": "Simulation settings updated",
        "state": simulation_state
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)