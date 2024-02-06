"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { CarbonFormValues } from "./form-utils";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function CarbonForm({ setResults }: any) {
  const methods = useForm<CarbonFormValues>({
    resolver: yupResolver(
      yup.object().shape({
        origin: yup.string().required("Origin is required and must be a text"),
        destination: yup
          .string()
          .required("Destination is required and must be a text"),
        volume: yup
          .number()
          .notRequired()
          .nullable()
          .typeError("Volume must be a number"),
        weight: yup
          .number()
          .required("Weight is required and must be a number"),
      })
    ),
    defaultValues: {
      origin: "",
      destination: "",
      volume: null,
      weight: null,
    } as any,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: CarbonFormValues) => {
    const input = {
      origin: data.origin,
      destination: data.destination,
      volume: data.volume,
      weight: data.weight,
    };

    const results = await axios.post(`/api/carbon`, input);

    if (results?.status !== 200) {
      alert("Error on submit");
      return;
    } else {
      setResults(results?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 w-full bg-white p-4 rounded-md">
        <div>
          <input
            type="text"
            className="border-[1px] w-full border-gray-700 rounded-md p-2 text-black"
            placeholder="Origin Address: example 'Elm Street, 1234, Springfield, IL, USA'"
            {...register("origin")}
          />
          {errors.origin && (
            <p className="text-red-500 pt-1">{errors.origin.message}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            className="border-[1px] w-full border-gray-700 rounded-md p-2 text-black"
            placeholder="Destination Address: example 'Pearl Street, 5678, Springfield, IL, USA'"
            {...register("destination")}
          />
          {errors.destination && (
            <p className="text-red-500 pt-1">{errors.destination.message}</p>
          )}
        </div>
        <div>
          <input
            type="number"
            className="border-[1px] w-full border-gray-700 rounded-md p-2 text-black"
            placeholder="Total volume of goods in m3: example '100'"
            {...register("volume")}
          />
          {errors.volume && (
            <p className="text-red-500 pt-1">{errors.volume.message}</p>
          )}
        </div>
        <div>
          <input
            type="number"
            className="border-[1px] w-full border-gray-700 rounded-md p-2 text-black"
            placeholder="Totall weight of goods in kg: example '1000'"
            {...register("weight")}
          />
          {errors.weight && (
            <p className="text-red-500 pt-1">{errors.weight.message}</p>
          )}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Submit
        </button>
      </div>
    </form>
  );
}
