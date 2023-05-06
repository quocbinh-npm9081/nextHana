import bcrypt from "bcryptjs";

const data = {
  backgrounds: {
    loginPage: [
      {
        image:
          "/static/images/backgrounds/loginPage/ian-dooley-7m0OJhmjqYg-unsplash.jpg",
        isActive: true,
      },
    ],
  },
  products: [
    {
      name: "ao nikken",
      slug: "ao-nikken",
      category: "shirts",
      images: [
        "/static/images/products/shirt1.jpg",
        "/static/images/products/shirt2.jpg",
      ],
      price: 700000,
      brand: "nike",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      sale: 0,
      sizes: ["s", "l", "m"],
    },
    {
      name: "vbn Pants",
      slug: "vbn-Pandfts",
      category: "Pants",
      images: [
        "/static/images/products/pants1.jpg",
        "/static/images/products/pants2.jpg",
        "/static/images/products/pants1.jpg",
      ],
      price: 900000,
      brand: "oliver",
      rating: 1.5,
      numReviews: 23,
      countInStock: 8,
      description:
        "Ut Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur. enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      sale: 10,
      sizes: ["s", "l", "m"],
    },
    {
      name: "121212 Pants",
      slug: "121212-Pantsxz",
      category: "Pants",
      images: [
        "/static/images/products/pants1.jpg",
        "/static/images/products/pants2.jpg",
        "/static/images/products/pants1.jpg",
      ],
      price: 240000,
      brand: "oliver",
      rating: 2.5,
      numReviews: 23,
      countInStock: 8,
      description:
        "Ut enim vUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur. ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      sale: 10,
      sizes: ["s", "l", "m"],
    },
    {
      name: "jjjjjjjj",
      slug: "jjjjjjjj",
      category: "Pants",
      images: [
        "/static/images/products/pants1.jpg",
        "/static/images/products/pants2.jpg",
      ],
      price: 110000,
      brand: "oliver",
      rating: 2.5,
      numReviews: 23,
      countInStock: 8,
      description:
        "Ut enim adUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur. minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      sale: 10,
      colors: ["blue", "yellow"],
      sizes: ["s", "l", "m"],
    },
  ],
  categories: [
    {
      name: "Ao",
      slug: "ao",
      image: "/static/images/products/pants1.jpg",
    },
    {
      name: "Quan",
      slug: "quan",
      image: "/static/images/products/pants2.jpg",
    },
    {
      name: "My pham",
      slug: "my-pham",
      image: "/static/images/products/shirt2.jpg",
    },
    {
      name: "Cham soc suc khoe",
      slug: "cham-socsuc-khoe",
      image: "/static/images/products/shirt1.jpg",
    },
  ],
  banners: [
    {
      iamge: "/static/images/banners/banner1.jpg",
    },
    {
      iamge: "/static/images/banners/banner2.jpg",
    },
  ],
  users: [
    {
      username: "Binh",
      phoneNumber: "0326732670",
      password: bcrypt.hashSync("12345678"),
      isAdmin: true,
    },
    {
      username: "An",
      phoneNumber: "0979853419",
      password: bcrypt.hashSync("0987654321"),
      isAdmin: false,
    },
  ],
};

export default data;
