# Definition
- System design 

Main types of System Design:

# Hight level design:
- Describes the main components that would be developed for the resulting product.
- Something like -> System architecture details, 
                -> Database design
                -> Service and processes.
                -> The relationship between various modules and features.


# Low level design:
- Mô tả thiết kế của mỗi element được nói tới trong phần Hight level design.
    -> Classes, interfaces, relationships between different classes and actual logic of components.



Reserve Parking System:
    -> Parking:
        - ID
        - Spot number
        - Availability
        - Flat_Rate (base on vehicle type and time)
        - Vehicle type
        - Location

    -> Vehicle:
        - ID 
        - Parking ID
        - Registration number
        - Type
        - Color
        - Check-in
        - Checkout 
        - Pay_status (paid/unpaid)

Reserve:
    - ID 

-> Public API 

--> /reserve
