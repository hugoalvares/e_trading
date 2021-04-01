import 'dart:convert';

PositionResponse positionResponseFromJson(String str) => PositionResponse.fromJson(json.decode(str));

String positionResponseToJson(PositionResponse data) => json.encode(data.toJson());

class PositionResponse {
    PositionResponse({
        this.checkingAccountAmount,
        this.positions,
        this.consolidated,
        this.message,
    });

    int checkingAccountAmount;
    List<Position> positions;
    double consolidated;
    String message;

    factory PositionResponse.fromJson(Map<String, dynamic> json) => PositionResponse(
        checkingAccountAmount: json["checkingAccountAmount"],
        positions: List<Position>.from(json["positions"].map((x) => Position.fromJson(x))),
        consolidated: json["consolidated"].toDouble(),
        message: json["message"],
    );

    Map<String, dynamic> toJson() => {
        "checkingAccountAmount": checkingAccountAmount,
        "positions": List<dynamic>.from(positions.map((x) => x.toJson())),
        "consolidated": consolidated,
        "message": message,
    };
}

class Position {
    Position({
        this.symbol,
        this.amount,
        this.currentPrice,
    });

    String symbol;
    int amount;
    double currentPrice;

    factory Position.fromJson(Map<String, dynamic> json) => Position(
        symbol: json["symbol"],
        amount: json["amount"],
        currentPrice: json["currentPrice"].toDouble(),
    );

    Map<String, dynamic> toJson() => {
        "symbol": symbol,
        "amount": amount,
        "currentPrice": currentPrice,
    };
}
