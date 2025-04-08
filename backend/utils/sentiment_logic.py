# internal

# external

# built-in

def sentiment_logic(polarity: int) -> str:
    if polarity <= 0.1 and polarity >= -0.1:
        return "Not enough reliable data to make a prediction."
    elif polarity < 0 and polarity > -0.2:
        return "Slightly low sentiment: Confidence: low"
    elif polarity <= -0.2 and polarity > -0.5:
        return "Low sentiment: Confidence: medium"
    elif polarity <= -0.5:
        return "Very low sentiment: Confidence: high"
    elif polarity > 0 and polarity < 0.2:
        return "Slightly high sentiment: Confidence: low"
    elif polarity >= 0.2 and polarity < 0.5:
        return "High sentiment: Confidence: medium"
    elif polarity >= 0.5:
        return "Very high sentiment: Confidence: high"