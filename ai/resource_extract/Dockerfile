FROM ubuntu:latest

WORKDIR /app

COPY dependecies.sh dependecies.sh

RUN chmod +x dependecies.sh

RUN ./dependecies.sh


COPY . .

RUN pip install -r requirements.txt

CMD [ "python3 ","./resource_extract_ai.py" ]