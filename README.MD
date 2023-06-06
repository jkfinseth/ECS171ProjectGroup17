# ECS 171 Group 17 Project

## Venv setup

If the requirements aren't installed (notably `flask`), then a virtual environment is recommended.

### 1. Create virtual environment

`python -m venv .venv`

### 2. Activate virtual environment

#### Windows

`.\.venv\Scripts\activate`

#### MacOS/Linux

`source ./.venv/bin/activate`

### 3. Install requirements

`pip install -r requirements.txt`

## Running the project

Be sure the environment is activated with step 2 from above

`python -m flask --app server run`

Then open `http://localhost:5000` on your browser