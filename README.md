# SCERTIF Chatbot

SCERTIF Chatbot forum bot.

## How to run it(Command Prompt)

```bash
>cd /d [your directory]
>chatbot.py
```

## Usage

```python
http://127.0.0.1:5006/api/chatbot/[message]
http://127.0.0.1:5006/api/chatbot/question/[message]
```

## Example
```python
http://127.0.0.1:5006/api/chatbot/Hello
Hello!
```
## Question responder(Not yet)
```python
http://127.0.0.1:5006/api/chatbot/question/A customer with an Aruba Controller wants to set it up to work with ClearPass Guest...
    {
      "_id": {
        "$oid": "5fb5b14fe188810fced936cf"
      },
      "question": "A customer with an Aruba Controller wants to set it up to work with ClearPass Guest. Hoe should they configure ClearPass as an authentication server in the controller so that guests are able to authenticate successfully?",
      "choices": [
        "A. Add ClearPass as RADIUS CoA server.",
        "B. Add ClearPass as a TACACS+ authentication server.\nC. Add ClearPass as a RADIUS authentication server.\nD. Add ClearPass as a HTTPS authentication server."
      ],
      "correctAnswers": [
        "A. Add ClearPass as RADIUS CoA server."
      ]
    }
```