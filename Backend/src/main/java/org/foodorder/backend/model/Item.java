package org.foodorder.backend.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "availablemeals")
@Getter
@Setter
@AllArgsConstructor
public class Item {

    @Id
    private String id;
    private String name;
    private int price;
    private String description;
    private String image;
}
