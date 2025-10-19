import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: {
    type: String,
    default:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAnCAYAAACBvSFyAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAN4SURBVHgBzVg7ctpAGF4BRbrQ2TMuopzAiu2CVMFdOucGOCcInMBwAsMJwCeIXaU0dGQGiLiBUpF0KhmGR75PrMhK6LHi4fE/s7MP7e7/7b//a2WIHejq6qq8Wq0qKGV0TTlss+RyuYfBYNAVGcjIMtmyLDOfz7cl8yTqLJfLhm3bjjgkCACwcMpnNIuaSxwAudYBkhMaRAkAwHcfACThgkEd5cNoNDJYpHQ6yjKuecbaVNB5oUFnZ2dtVCUJwEH5iBM+/QH5c9D8PZlMnk5OTsaGYXzG0BuCRnuK8V7S/qnXIa/hl9/H6d+niRhLqlhzL7uuXOPGzU+9DmxWUbodnTvGnCakZcsur+NTIg+RQhCn5bdxokehSVjX3TDJ5SyxD4jQxm6G6WOlbYpDgYCIdc2T9FZpu3uBoDVsJqeINbSu7LdxjbbYB0RID6o6dk+/gqv7ogz19gIhN/DFWVRMLw5AUXpWjyCRbppFpTorOKEpHNBf5WTW6ekpy098C9w1AxuqH0JRRIC4Ds8LU5bYcYcT1gOL12boSGbUl4DO4CqrkEIrbe+sUXQLSBQxtqAQwIPQoEwgJBAq3X1I8TbMMc4w3tIN4zuBUMAwOJ2DseltZBgMbOOkGPGqaWdJlEolk/VisSjSkxYKBWc6nbq7SEILBBnOZrMbBrNQXhlFBOGg2LQegOyl6UcsCOl0KlRAjZwykaQpt4bD4aM2iMvLSzKmZzRFDNESxPrUfuFcKmuSW4/MOwMgpMY3USoRDG3UPAnduBN394rVWJQiSjliWgN5aX0LhOLzLZU5ShPN1q6mJ5PkOzRvQ586API1AOLi4qKtToTYyLxxKLuPcXI1AGkaEsAtqrYCoA7mDXEEAi/qWlV2vSTYC+UQ+Y0yr3MsACScvMbwLrtUgW8eCFV5+HwTRybw2wQ2KrCf1GzMKkvg2ZVwekfpFjMluoei+XweUHYfxGZQJ4fclyBtm8pPv4NSK8hxR/z3D6y74sikKr8via4/QFt+CWmo5IFgJqSA8B7AiB8V8UKkuu1qRDrPdK3Lxy1qPvld5g380O/3nagN/TwDymficGyfY50p/2nUojxwOIBVpZ8/ynUAzC3C+VbyGzBRPun59wXNjvr8OwRREkxwor4lZlb8QYLqHaRTlgktJeTVcXmDAt5h8ivW8YFv0ae4YPgPspPhtg0cN1gAAAAASUVORK5CYII=",
  },
  address: {
    line1: { type: String, default: "" },
    line2: { type: String, default: "" },
  },
  gender: { type: String, default: "Not Specified" },
  dob: { type: String, default: "Not Specified" },
  phone: { type: String, default: "0000000000" },
});

export const User = mongoose.model("User", userSchema);
