test('Title of the page', async () => {
    const today = new Date();
    const day = new Date();
    const vday = day + "now";
    expect(today + "now").toBe(vday);

  });