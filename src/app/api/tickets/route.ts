import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { name, email, quantity } = await request.json();

    // Validar datos
    if (!name || !email || !quantity) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    // Crear boleto
    const { data, error } = await supabaseAdmin
      .from("tickets")
      .insert({
        name,
        email,
        quantity,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating ticket:", error);
      return NextResponse.json(
        { error: "Error al crear boleto" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Código requerido" }, { status: 400 });
    }

    // Buscar boleto
    const { data, error } = await supabaseAdmin
      .from("tickets")
      .select("*")
      .eq("code", code.toUpperCase())
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Boleto no encontrado" },
          { status: 404 }
        );
      }
      console.error("Error finding ticket:", error);
      return NextResponse.json(
        { error: "Error al buscar boleto" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
