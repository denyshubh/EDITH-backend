CREATE TABLE car (
    vin VARCHAR(255) PRIMARY KEY,
    make_id VARCHAR(1000),
    model_id VARCHAR(1000),
    year INT(4),
    ecrgradeid INT(3),
    mileage INT(8),
    saleurl VARCHAR(500),
    location_id VARCHAR(1000),
    createdate DATE,
    CONSTRAINT FK_MAKEID FOREIGN KEY (make_id) REFERENCES make(make_id),
    CONSTRAINT FK_MODELID FOREIGN KEY (model_id) REFERENCES model(model_id),
    CONSTRAINT FK_LOCATIONID FOREIGN KEY (location_id) REFERENCES location(location_id)
)