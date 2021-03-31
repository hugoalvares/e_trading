import 'dart:convert';

LoginResponse loginResponseFromJson(String str) => LoginResponse.fromJson(json.decode(str));

String loginResponseToJson(LoginResponse data) => json.encode(data.toJson());

class LoginResponse {
    LoginResponse({
        this.message,
    });

    String message;

    factory LoginResponse.fromJson(Map<String, dynamic> json) => LoginResponse(
        message: json['message'],
    );

    Map<String, dynamic> toJson() => {
        'message': message,
    };
}
