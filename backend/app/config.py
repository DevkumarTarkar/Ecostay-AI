from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    API_PORT: int = 8000
    JWT_SECRET: str = "supersecretkeyforecostayaiweek6developmentonly"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()

