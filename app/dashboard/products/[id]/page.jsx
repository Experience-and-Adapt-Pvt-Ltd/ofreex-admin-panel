// import { updateProduct } from "@/app/lib/actions";
// import { fetchProduct } from "@/app/lib/data";
import styles from "@/app/frontend/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";

const SingleProductPage = async ({ params }) => {
//   const { id } = params;
//   const product = await fetchProduct(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        
      </div>
      <div className={styles.formContainer}>
        <form  className={styles.form}>
          <input type="hidden" name="id"  />
          <label>Title</label>
          <input type="text" name="title" />
          <label>Price</label>
          <input type="number" name="price"  />
          <label>Stock</label>
          <input type="number" name="stock" />
          <label>Color</label>
          <input
            type="text"
            name="color"
            placeholder= "color"
          />
          <label>Size</label>
          <textarea
            type="text"
            name="size"
            placeholder="size"
          />
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="computers">Computers</option>
          </select>
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows="10"
            
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;