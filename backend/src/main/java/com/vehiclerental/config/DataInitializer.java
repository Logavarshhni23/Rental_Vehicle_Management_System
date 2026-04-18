package com.vehiclerental.config;

import com.vehiclerental.model.Vehicle;
import com.vehiclerental.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public void run(String... args) throws Exception {
        if (vehicleRepository.count() == 0) {
            List<Vehicle> vehicles = Arrays.asList(
                    // Cars - Sedan
                    createVehicle("Toyota Camry", "car", 5,
                            "Air Conditioning, Bluetooth, USB, Reverse Camera, Leather Seats", "petrol", "2024",
                            "Silver", 2500.0, true,
                            "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop"),
                    createVehicle("Honda City", "car", 5,
                            "Air Conditioning, Bluetooth, USB, Sunroof, Push Button Start", "petrol", "2024", "White",
                            1800.0, true,
                            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop"),
                    createVehicle("Maruti Dzire", "car", 5, "Air Conditioning, Music System, Power Steering, ABS",
                            "petrol", "2023", "Red", 1200.0, true,
                            "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&h=400&fit=crop"),
                    createVehicle("Hyundai Verna", "car", 5,
                            "Air Conditioning, Touchscreen, Sunroof, Wireless Charging", "petrol", "2024", "Blue",
                            2200.0, true,
                            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop"),
                    createVehicle("Kia Sonet", "car", 5,
                            "Air Conditioning, Touchscreen, Sunroof, Wireless Charging, Ventilated Seats", "petrol",
                            "2024", "Black", 2000.0, true,
                            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop"),

                    // Cars - SUV
                    createVehicle("Toyota Innova Crysta", "suv", 7,
                            "Air Conditioning, Bluetooth, USB, Leather Seats, Rear Entertainment", "diesel", "2024",
                            "White", 3500.0, true,
                            "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop"),
                    createVehicle("Mahindra XUV500", "suv", 7,
                            "Air Conditioning, Sunroof, All Wheel Drive, Leather Seats", "diesel", "2023", "Black",
                            2800.0, true,
                            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop"),
                    createVehicle("Kia Seltos", "suv", 5,
                            "Air Conditioning, Touchscreen, Sunroof, Bose Audio, Ventilated Seats", "petrol", "2024",
                            "Red", 2200.0, true,
                            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop"),
                    createVehicle("Hyundai Creta", "suv", 5,
                            "Air Conditioning, Touchscreen, Sunroof, Wireless Charging", "petrol", "2024", "Grey",
                            2100.0, true,
                            "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop"),
                    createVehicle("MG Hector", "suv", 5,
                            "Air Conditioning, Large Touchscreen, Sunroof, Internet Connectivity", "petrol", "2024",
                            "Blue", 2300.0, true,
                            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop"),
                    createVehicle("Tata Nexon", "suv", 5, "Air Conditioning, Touchscreen, Sunroof, Harman Audio",
                            "petrol", "2024", "White", 1500.0, true,
                            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop"),
                    createVehicle("Tata Harrier", "suv", 5,
                            "Air Conditioning, Panoramic Sunroof, Leather Seats, Terrain Modes", "diesel", "2024",
                            "Black", 2800.0, true,
                            "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop"),

                    // Cars - Hatchback
                    createVehicle("Maruti Swift", "hatchback", 5, "Air Conditioning, Music System, Power Steering, ABS",
                            "petrol", "2024", "Red", 1000.0, true,
                            "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&h=400&fit=crop"),
                    createVehicle("Baleno", "hatchback", 5,
                            "Air Conditioning, Touchscreen, Projector Headlamps, LED DRLs", "petrol", "2024", "Silver",
                            1100.0, true,
                            "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&h=400&fit=crop"),
                    createVehicle("Tata Altroz", "hatchback", 5,
                            "Air Conditioning, Touchscreen, Sunroof, Rear AC Vents", "petrol", "2024", "White", 1200.0,
                            true,
                            "https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=600&h=400&fit=crop"),
                    createVehicle("Hyundai i20", "hatchback", 5,
                            "Air Conditioning, Touchscreen, Sunroof, Wireless Charging", "petrol", "2024", "Blue",
                            1400.0, true,
                            "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=400&fit=crop"),

                    // Cars - Luxury
                    createVehicle("BMW 3 Series", "luxury", 5,
                            "Air Conditioning, Leather Seats, Sunroof, Navigation, Harman Kardon Audio", "petrol",
                            "2024", "Black", 8000.0, true,
                            "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop"),
                    createVehicle("Mercedes C-Class", "luxury", 5,
                            "Air Conditioning, Leather Seats, Sunroof, Burmester Audio, 360 Camera", "petrol", "2024",
                            "White", 9000.0, true,
                            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop"),
                    createVehicle("Audi A4", "luxury", 5, "Air Conditioning, Leather Seats, Sunroof, Virtual Cockpit",
                            "petrol", "2024", "Grey", 7500.0, true,
                            "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=400&fit=crop"),

                    // Bikes
                    createVehicle("Royal Enfield Classic 350", "bike", 2,
                            "Kick Start, Analog Console, USB Charging, LED Headlamp", "petrol", "2024", "Black", 600.0,
                            true,
                            "https://images.unsplash.com/photo-1558981806-ec527fa84c3d?w=600&h=400&fit=crop"),
                    createVehicle("Honda Activa 6G", "scooter", 2,
                            "Auto Start, LED Headlamp, External Fuel Fill, Silent Start", "petrol", "2024", "White",
                            400.0, true,
                            "https://images.unsplash.com/photo-1622185135505-2d795043906a?w=600&h=400&fit=crop"),
                    createVehicle("TVS Jupiter", "scooter", 2,
                            "Auto Start, LED Headlamp, External Fuel Fill, Mobile Charger", "petrol", "2024", "Blue",
                            450.0, true,
                            "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&h=400&fit=crop"),
                    createVehicle("Bajaj Pulsar NS200", "bike", 2,
                            "Digital Console, LED Headlamp, Disc Brakes, Gas Filled Shock Absorbers", "petrol", "2024",
                            "Orange", 550.0, true,
                            "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&h=400&fit=crop"),
                    createVehicle("KTM Duke 200", "bike", 2, "Digital Console, LED Headlamp, Slipper Clutch, USD Forks",
                            "petrol", "2024", "Orange", 800.0, true,
                            "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&h=400&fit=crop"),

                    // Tempo/Traveller
                    createVehicle("Force Tempo Traveller", "tempo", 12,
                            "Air Conditioning, Music System, Push Back Seats, Reading Lights", "diesel", "2023",
                            "White", 2500.0, true,
                            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop"),
                    createVehicle("Mahindra Bolero Pickup", "truck", 2,
                            "Power Steering, Music System, Cargo Bed, Diesel Engine", "diesel", "2023", "White", 1500.0,
                            true,
                            "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop"),
                    createVehicle("Tata Ace HT", "truck", 2,
                            "Power Steering, Cargo Bed, Diesel Engine, Load Capacity 1 Ton", "diesel", "2023", "White",
                            1200.0, true,
                            "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&h=400&fit=crop"));

            vehicleRepository.saveAll(vehicles);
            System.out.println("Initialized " + vehicles.size() + " vehicles");
        }
    }

    private Vehicle createVehicle(String name, String type, int seats, String features,
            String fuelType, String model, String color,
            double pricePerDay, boolean availability, String imageUrl) {
        Vehicle vehicle = new Vehicle();
        vehicle.setName(name);
        vehicle.setType(type);
        vehicle.setSeats(seats);
        vehicle.setFeatures(features);
        vehicle.setFuelType(fuelType);
        vehicle.setModel(model);
        vehicle.setColor(color);
        vehicle.setPricePerDay(pricePerDay);
        vehicle.setAvailability(availability);
        vehicle.setHostedBy("Admin");
        vehicle.setImage(imageUrl);
        return vehicle;
    }
}