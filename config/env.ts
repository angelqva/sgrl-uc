import "dotenv/config";
import { schemaVariablesEntorno } from "@/schema";

const CONSTANTS = schemaVariablesEntorno.parse(process.env);

export default CONSTANTS;
