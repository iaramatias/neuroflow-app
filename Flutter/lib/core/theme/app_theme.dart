import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      primarySwatch: Colors.blue,
      visualDensity: VisualDensity.adaptivePlatformDensity,
      // Configure additional theme properties here
      appBarTheme: const AppBarTheme(elevation: 0, centerTitle: true),
    );
  }
}
