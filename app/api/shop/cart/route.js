import {
  addToCart,
  decrementCartItem,
  getCarts,
  removeFromCart,
} from "@/queries/shop-queries";

export async function GET(request) {
  const searchParams = request?.nextUrl?.searchParams;
  const query = searchParams?.get("useremail");
  try {
    if (!query) {
      return Response.json({
        status: 404,
        message: "Invalid query",
      });
    }
    const res = await getCarts(query);
    if (!res) {
      return Response.json({
        status: 404,
        message: "Invalid query",
      });
    }

    return Response.json({
      status: 200,
      data: res,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      data: [],
      error: error,
    });
  }
}

export async function POST(request) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get("action");

  if (action === "decrement") {
    const userEmail = searchParams.get("userEmail");
    const productId = searchParams.get("productId");

    if (!userEmail && !productId) {
      return Response.json({
        status: 404,
        message: "Invalid user email or product",
      });
    }

    const res = await decrementCartItem(userEmail, productId);
    return Response.json({
      status: 201,
      data: res,
    });
  }

  if (action === "delete") {
    const userEmail = searchParams.get("userEmail");
    const productId = searchParams.get("productId");

    if (!userEmail && !productId) {
      return Response.json({
        status: 404,
        message: "Invalid user email or product",
      });
    }

    const res = await removeFromCart(userEmail, productId);
    return Response.json({
      status: 201,
      data: res,
    });
  }

  if (!action) {
    const { userEmail, productId, qty } = await request.json();
    try {
      if (!userEmail || !productId) {
        return Response.json({
          status: 500,
        });
      }
      const res = await addToCart(userEmail, productId, qty);
      return Response.json({
        status: 201,
        data: res,
      });
    } catch (error) {
      return Response.json({
        status: 500,
        error: error,
      });
    }
  }
}
