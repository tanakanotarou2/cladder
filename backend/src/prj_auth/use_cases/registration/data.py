from dataclasses import dataclass
from typing import Optional


@dataclass
class RegisterUserRequest:
    username: str
    password: str
    last_name: Optional[str] = ""
    first_name: Optional[str] = ""
