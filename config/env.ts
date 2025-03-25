import "dotenv/config";
import { schemaVariablesEntorno } from "@/schema/environment";

const CONSTANTS = schemaVariablesEntorno.parse(process.env);

export default CONSTANTS;
