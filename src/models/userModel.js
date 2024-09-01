import sql from "mssql";

export const emailExists = async (email) => {
  const request = new sql.Request();
  const result = await request
    .input("email", sql.NVarChar, email)
    .query("SELECT * FROM [User] WHERE email = @email");

  return result.recordset[0] ? true : false;
};

export const insertUser = async (
  name,
  contactNumber,
  email,
  password,
  status,
  role
) => {
  try {
    const request = new sql.Request();
    await request
      .input("name", sql.VarChar, name)
      .input("contactNumber", sql.VarChar, contactNumber)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, password)
      .input("status", sql.VarChar, status)
      .input("role", sql.VarChar, role)
      .query(
        `insert into [User] values(@name,@contactNumber,@email,@password,@status,@role)`
      );
  } catch (err) {
    throw err;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const request = new sql.Request();
    const result = await request
      .input("email", sql.NVarChar, email)
      .query("SELECT * FROM [User] WHERE email = @email");
    return result.recordset[0];
  } catch (err) {
    throw err;
  }
};

export const updatePassword = async (email, password) => {
  try {
    const request = new sql.Request();
    await request
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, password)
      .query("update [User] set Password = @password WHERE email = @email");
  } catch (err) {
    throw err;
  }
};

export const getAllUser = async () => {
  try {
    const request = new sql.Request();
    const result = await request.query(
      "select * from [User] where role='User'"
    );
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

export const updateStatus = async (email, status) => {
  try {
    if (!(await getUserByEmail(email))) {
      throw new Error("User not found");
    }
    const request = new sql.Request();
    await request
      .input("email", sql.NVarChar, email)
      .input("status", sql.NVarChar, status)
      .query("update [User] set status = @status where email=@email");
  } catch (err) {
    throw err;
  }
};
