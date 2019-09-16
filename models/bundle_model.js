module.exports = (sequelize, type) => {
    return sequelize.define('bundle', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_name: {
            type: type.STRING,
            allowNull: false
        }, 
        price: {
            type:type.DECIMAL(10,2),
            allowNull: false,
        },
        
        product_code: {
            type: type.INTEGER.UNSIGNED ,
            allowNull: false
        },
        
        product_exp_date: {
            type: type.DATE,
            allowNull: true
        },
        
        availability: {
            type: type.DATE,
            allowNull: false
        },
        active:{
            type: type.BOOLEAN,
            defaultValue: 0
        }

    })
};