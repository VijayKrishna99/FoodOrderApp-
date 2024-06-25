package org.foodorder.backend.repository;

import org.foodorder.backend.model.CartItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepository extends MongoRepository<CartItem, String> {
}
