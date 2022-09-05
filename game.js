let game = {
	lockMode: false,
	firstCard: null,
	secondCard: null,
	setCard: function (id) {
		let card = this.cards.filter((card) => card.id === id)[0];
		console.log(card);
		if (card.flipped || this.lockMode) {
			return false;
		}
		if (!this.firstCard) {
			this.firstCard = card;
			this.firstCard.flipped = true;
			return true;
		} else {
			this.secondCard = card;
			this.secondCard.flipped = true;
			this.lockMode = true;
			return true;
		}
	},
	checkMatch: function () {
		if (!this.firstCard || !this.secondCard) {
			return false;
		}
		return this.firstCard.icon == this.secondCard.icon;
	},
	clearCards: function () {
		this.firstCard = null;
		this.secondCard = null;
		this.lockMode = false;
	},
	unflipCards: function () {
		this.firstCard.flipped = false;
		this.secondCard.flipped = false;
		this.clearCards();
	},
	checkGameOver: function () {
		return this.cards.filter((card) => !card.flipped).length === 0;
	},
	teams: ['America-MG-VERDE-fev2019-01', 'Athletico-PR', 'atletico-go-2020', 'atletico-mg', 'avai-futebol-clube', 'botafogo-svg', 'bragantino', 'ceara', 'Corinthians', 'coritiba', 'Cuiaba_EC', 'Flamengo-2018', 'fluminense', 'Fortaleza_2021_1', 'GOIAS-2021', 'internacional', 'Juventude-2021-01', 'Palmeiras', 'santos', 'sao-paulo'],
	cards: null,
	createCardsFromTeams: function () {
		this.cards = [];
		for (let team of this.teams) {
			this.cards.push(this.createPair(team));
		}
		this.cards = this.cards.flatMap((pair) => pair);
		this.shuffleCards();
		return this.cards;
	},
	createPair: function (team) {
		return [
			{
				id: this.createId(team),
				icon: team,
				flipped: false,
			},
			{
				id: this.createId(team),
				icon: team,
				flipped: false,
			},
		];
	},
	createId: function (team) {
		return team + parseInt(Math.random() * 1000);
	},
	shuffleCards: function (cards) {
		let currentId = this.cards.length;
		let randomId = 0;

		while (currentId != 0) {
			randomId = Math.floor(Math.random() * currentId);
			currentId--;
			[this.cards[randomId], this.cards[currentId]] = [this.cards[currentId], this.cards[randomId]];
		}
	},
};
