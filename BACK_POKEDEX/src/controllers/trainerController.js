/////controladores del account

//// ejemplo /edit/me-/delete/me



/// to fix: add favorites....
const toggleAdminPokemon = async (req, res) => {
  try {
    const { pokeID } = req.params;
    const { userID } = req.body;
    const pokeNum = Number(pokeID);
    if (!userID || !pokeNum)
      return res.status(400).json({
        status: "Failed",
        message: "Missing adminID or pokeID",
      });

    const admin = await Admin.findOne({ userID });
    if (!admin)
      return res.status(404).json({
        status: "Failed",
        message: "Admin not found",
      });

    const existsInDB = await Pokemon.findOne({ pokeID: pokeNum });
    if (!existsInDB)
      return res.status(404).json({
        status: "Failed",
        message: "Pokemon not found in database",
      });

    const isInTeam = admin.adminCollection.includes(pokeNum);

    if (isInTeam) {
      admin.adminCollection = admin.adminCollection.filter(
        (id) => id !== pokeNum
      );
      await admin.save();
      return res.status(200).json({
        status: "Success",
        message: "Pokemon removed from admin team",
        data: admin.adminCollection,
      });
    }

    if (admin.adminCollection.length >= 6) {
      return res.status(400).json({
        status: "Failed",
        message: "Admin team already has 6 Pokemon",
      });
    }
    admin.adminCollection.push(pokeNum);
    await admin.save();

    return res.status(200).json({
      status: "Success",
      message: `Pokemon added to admin team: ${existsInDB.pokeName}`,
      data: admin.adminCollection,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};