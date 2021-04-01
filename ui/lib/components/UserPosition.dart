import 'package:flutter/material.dart';
import 'package:ui/models/PositionResponse.dart';

class UserPosition extends StatefulWidget {
  @override
  UserPositionState createState() {
    return UserPositionState();
  }
}

class UserPositionState extends State<UserPosition> {

  @override
  Widget build(BuildContext context) {
    final PositionResponse positionResponse = ModalRoute.of(context).settings.arguments;

    buildPositions() {
      return (currentPosition) => Text(
        'Name: ' + currentPosition.symbol + ' - Value: ' + currentPosition.currentPrice.toString() + ' - Amount: ' + currentPosition.amount.toString()
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text('Welcome'),
        centerTitle: true,
      ),
      body: Center(
        child: Column(
          children: [
            Text('Checking account balance: ' + positionResponse.checkingAccountAmount.toString()),
            Text('Consolidated position: ' + positionResponse.consolidated.toString()),
            Text('List of current assets: '),
            ...positionResponse.positions.map(buildPositions()).toList(),
          ]
        ),
      ),
    );
  }
}
