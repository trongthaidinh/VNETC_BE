const pt = (data) => {
    const {page = 0, limit = 10} = data
    console.log(page, limit);
}

pt({})