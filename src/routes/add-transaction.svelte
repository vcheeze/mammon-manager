<script>
  let name = '';
  let amount = 0;
  let date;

  async function onSubmit(e) {
    const res = await fetch('/api/addTransaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        amount,
        date,
      }),
    });

    console.log('res :>> ', res);
    if (res.ok) {
      name = '';
      amount = 0;
      date = '';
    }
  }
</script>

<svelte:head>
	<title>Add Transaction</title>
</svelte:head>

<h1>Add a Transaction</h1>

<form on:submit|preventDefault={onSubmit}>
  <label for="name">Name</label>
  <input type="text" id="name" name="name" bind:value={name} />

  <label for="amount">Amount</label>
  <input type="number"id="amount" name="amount" bind:value={amount} />

  <label for="date">Date</label>
  <input type="date" id="date" name="date" bind:value={date} />

  <button type="submit">Add</button>
</form>
