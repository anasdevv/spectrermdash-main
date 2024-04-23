import fs, { Stats } from "fs";
import { NextApiResponse } from "next";
import { redirect } from "next/navigation";
import path from "path";
import { createReadStream } from "fs";
import { ReadableOptions } from "stream";

/**
 * Return a stream from the disk
 * @param {string} path - The location of the file
 * @param {ReadableOptions} options - The streamable options for the stream (ie how big are the chunks, start, end, etc).
 * @returns {ReadableStream} A readable stream of the file
 */
export function streamFile(
  path: string,
  options?: ReadableOptions,
): ReadableStream<Uint8Array> {
  const downloadStream = createReadStream(path, options);

  return new ReadableStream({
    start(controller) {
      downloadStream.on("data", (chunk: Buffer) =>
        controller.enqueue(new Uint8Array(chunk)),
      );
      downloadStream.on("end", () => controller.close());
      downloadStream.on("error", (error: NodeJS.ErrnoException) =>
        controller.error(error),
      );
    },
    cancel() {
      downloadStream.destroy();
    },
  });
}
import { NextResponse } from "next/server";
import { capitalizeFileName, filenames } from "@/utils/helper";

type GetParams = {
  params: {
    filename: string;
  };
};

export async function GET(
  req: Request,
  { params }: GetParams,
  response: NextApiResponse,
) {
  const filename = params.filename;
  if (!filenames.includes(filename)) {
    return redirect("page-not-found");
  }
  console.log("cwd ", process.cwd());
  const filePath = path.join(
    process.cwd(),
    `/src/county-data/${filename}-county.xlsx`,
  );

  const stats: Stats = await fs.promises.stat(filePath);
  const data: ReadableStream<Uint8Array> = streamFile(filePath); //Stream the file with a 1kb chunk

  const res = new NextResponse(data, {
    status: 200,
    headers: new Headers({
      "content-disposition": `attachment; filename=${capitalizeFileName(filename)} County.xlsx`,
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "content-length": stats.size + "",
    }),
  });

  return res;
}
