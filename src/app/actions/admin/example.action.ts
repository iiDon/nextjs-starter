"use server";

import { prisma } from "@/configs/prisma/prisma";
import { returnError } from "@/lib/errors/returnError";
import {
  createExampleSchema,
  CreateExampleType,
  updateExampleSchema,
  UpdateExampleType,
  deleteExampleSchema,
  DeleteExampleType,
} from "@/schemas/example.schema";
import { guard } from "../services/guard";
import { getLocale, getTranslations } from "next-intl/server";

export const createExample = async (dto: CreateExampleType) => {
  // type from example.schema.ts
  try {
    const session = await guard(["ADMIN"]);
    const locale = await getLocale(); // get locale
    const t = await getTranslations({
      locale,
      namespace: "Pages.Dashboard.Examples",
    }); // get translations
    const { success, data } = createExampleSchema.safeParse(dto);

    if (!success) {
      return {
        success: false,
        message: t("Invalid_data"),
      };
    }

    console.log("Just logging session", session);

    const example = await prisma.example.create({
      data: {
        ...data,
      },
    });

    return {
      success: true,
      data: example,
    };
  } catch (error) {
    return returnError(error);
  }
};

export const updateExample = async (dto: UpdateExampleType) => {
  try {
    await guard(["ADMIN"]);
    const { success, data } = updateExampleSchema.safeParse(dto);

    if (!success) {
      return {
        success: false,
        message: "Invalid data",
      };
    }

    const example = await prisma.example.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });

    return {
      success: true,
      data: example,
    };
  } catch (error) {
    return returnError(error);
  }
};

export const deleteExample = async (dto: DeleteExampleType) => {
  try {
    await guard(["ADMIN"]);
    const { success, data } = deleteExampleSchema.safeParse(dto);

    if (!success) {
      return {
        success: false,
        message: "Invalid data",
      };
    }

    const example = await prisma.example.delete({
      where: {
        id: data.id,
      },
    });

    return {
      success: true,
      data: example,
    };
  } catch (error) {
    return returnError(error);
  }
};
