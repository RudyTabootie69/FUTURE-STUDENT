/// Payment model for storing card information
class PaymentSummary {
  final String? brand;
  final String? last4;

  PaymentSummary({
    this.brand,
    this.last4,
  });

  /// Create PaymentSummary from JSON
  factory PaymentSummary.fromJson(Map<String, dynamic> json) {
    return PaymentSummary(
      brand: json['brand'] as String?,
      last4: json['last4'] as String?,
    );
  }

  /// Convert to JSON
  Map<String, dynamic> toJson() {
    return {
      'brand': brand,
      'last4': last4,
    };
  }

  /// Create a copy with modified fields
  PaymentSummary copyWith({
    String? brand,
    String? last4,
  }) {
    return PaymentSummary(
      brand: brand ?? this.brand,
      last4: last4 ?? this.last4,
    );
  }

  @override
  String toString() => 'PaymentSummary(brand: $brand, last4: $last4)';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is PaymentSummary &&
          runtimeType == other.runtimeType &&
          brand == other.brand &&
          last4 == other.last4;

  @override
  int get hashCode => brand.hashCode ^ last4.hashCode;
}
