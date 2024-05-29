import { createNewUser } from "@/queries/auth-queries";

export async function POST(request) {
  const userInfo = await request.json();

  try {
    const user = await createNewUser(userInfo);
    return Response.json({
      status: 200,
      message: "Success",
      data: user,
    });
  } catch (error) {
    return Response.json({
      status: error?.status,
      error: error?.stack,
      message: error?.message,
    });
  }
}
