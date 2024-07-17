
// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import styles from "@/app/ui/dashboard/categories/categories.module.css";
// import Search from "@/app/ui/dashboard/search/search";
// import Pagination from "@/app/ui/dashboard/pagination/pagination";

// const CategoriesPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("http://localhost:4002/listings/getCategories");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setCategories(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleVisibilityChange = (id, value) => {
//     setCategories((prevCategories) =>
//       prevCategories.map((category) =>
//         category.id === id ? { ...category, visible: value === "Yes" } : category
//       )
//     );
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.top}>
//         <Search placeholder="Search for a category..." />
//         <Link href="/dashboard/categories/add">
//           <button className={styles.addButton}>Add New</button>
//         </Link>
//       </div>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Category Name</th>
//             <th>Description</th>
//             <th>Icon</th>
//             <th>Visible</th>
//             <th>SubCategories</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((category) => (
//             <tr key={category.id}>
//               <td>{category.label}</td>
//               <td>{category.description}</td>
//               <td>
//                 <Image
//                   src={category.icon || "/default-image.png"}
//                   alt={category.label}
//                   width={40}
//                   height={40}
//                   className={styles.categoryImage}
//                 />
//               </td>
//               <td>
//                 <select
//                   value={category.visible ? "Yes" : "No"}
//                   onChange={(e) => handleVisibilityChange(category.id, e.target.value)}
//                 >
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               </td>
//               <td>
//                 <ul className={styles.subCategoryList}>
//                   {category.subCategories.map((subCategory) => (
//                     <li key={subCategory.id}>{subCategory.label}</li>
//                   ))}
//                 </ul>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Pagination />
//     </div>
//   );
// };

// export default CategoriesPage;
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/frontend/dashboard/categories/categories.module.css";
import Search from "@/app/frontend/dashboard/search/search";
import Pagination from "@/app/frontend/dashboard/pagination/pagination";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4002/listings/getCategories");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleVisibilityChange = async (id, name, value) => {
    const updatedVisible = value === "Yes"; // true for "Yes", false for "No"

    try {
      const response = await fetch(`http://localhost:4002/listings/updateCategory/${name}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_API_KEY", 
        },
        body: JSON.stringify({ id, visible: updatedVisible }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("Failed to update visibility");
      }

      const updatedCategory = await response.json();

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id ? updatedCategory : category
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a category..." />
        <Link href="/dashboard/categories/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Description</th>
            <th>Icon</th>
            <th>Visible</th>
            <th>SubCategories</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.label}</td>
              <td>{category.description}</td>
              <td>
                <Image
                  src={category.icon || "/default-image.png"}
                  alt={category.label}
                  width={40}
                  height={40}
                  className={styles.categoryImage}
                />
              </td>
              <td>
                <select
                  value={category.visible ? "Yes" : "No"}
                  onChange={(e) => handleVisibilityChange(category.id, category.label, e.target.value)}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </td>
              <td>
                <ul className={styles.subCategoryList}>
                  {category.subCategories.map((subCategory) => (
                    <li key={subCategory.id}>{subCategory.label}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default CategoriesPage;
