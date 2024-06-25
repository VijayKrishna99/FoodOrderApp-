package org.foodorder.backend.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cart")
@Getter
@Setter
public class CartItem {
    @Id
    private String id;

    private String name;
    private int price;
    private int quantity;
}
