import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: {
        type: String,
        required: [ true, "El nombre del producto es obligatorio." ],
        min: [ 3, "El minimo son 3 caracteres" ] },
    description: {
        type: String,
        required: [ true, "Debe ingresar una descripcion del producto" ] },
    code: {
        type: String,
        required: [ true, "Es obligatorio ingresar un codigo unico para el producto" ],
        unique: true },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: (v) => v > 0,
            message: "El precio debe ser mayor a cero." } },
    status: {
        type: Boolean,
        default: true },
    stock: {
        type: Number,
        required: true,
        validate: {
            validator: (v) => v >= 0,
            message: "El stock no puede ser negativo." } },
    category: {
        type: String,
        required: [ true, "Debe ingresar una categoria del producto." ] },
    availability:{
        type: Boolean,
        default: true,
        required: [ true, "Debe especificar si el producto esta disponible." ] },
    thumbnails:
        {
            type: Schema.Types.ObjectId,
            ref: "images",
            required: false,
            default: null,
        },

}, {
    timestamps: true,
    versionKey: false,
});

productSchema.plugin(paginate);

const ProductModel = model("products", productSchema);

export default ProductModel;