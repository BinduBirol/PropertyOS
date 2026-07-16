package com.bnroll.commercedomain.enums;


public enum ServiceName {

    AUTH_SERVICE("commerce-auth-service"),
    PROPERTY_SERVICE("commerce-property-service"),
    BOOKING_SERVICE("commerce-booking-service"),
    BILLING_SERVICE("commerce-billing-service");

    private final String value;

    ServiceName(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }

    public static boolean exists(String value) {
        for (ServiceName service : values()) {
            if (service.value.equals(value)) {
                return true;
            }
        }
        return false;
    }
}