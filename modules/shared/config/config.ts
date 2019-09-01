import { resolve } from "path"

import { config } from "dotenv";

config({ path: "../../../.env"  });
export const env = {
    ...process.env
}

