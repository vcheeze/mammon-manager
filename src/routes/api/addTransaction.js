import pool from '$lib/db';

export async function post(req) {
  const { name, amount, date } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      `INSERT INTO mammon_manager.transaction(name, amount, date) VALUES("${name}", "${amount}", "${date}")`
    );
    return {
      status: 201,
      body: { data: result, message: 'Successfully created transaction'},
    }
  } catch (err) {
    console.log('err :>> ', err);
    return { status: 400, body: { message: 'Failed to create transaction' }};
  } finally {
    if (conn) conn.end();
  }
}