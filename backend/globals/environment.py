from pydantic_settings import BaseSettings, SettingsConfigDict

class Environment(BaseSettings):
    TOGETHER_AI_KEY: str

    model_config: SettingsConfigDict = SettingsConfigDict(env_file='.env')