const app = new Vue({
    el: '#root',

    data: {

        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                }
                ],
            },
        ],
        activeChat: 0,
        newMessage: '',
        filterValue: '',
        filterMessage: '',
        clipMenu: false,
        menuOptionL: false,
        menuOptionR: false,
        messageSearch: false

    },

    methods: {

        changeActive: function (index) {
            this.activeChat = index;

            // close all menus
            this.openMenu();
        },

        sendMessage: function () {
            // only if text is not empty send the message
            if (this.newMessage != '') {

                this.contacts[this.activeChat].messages.push({
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    message: this.newMessage,
                    status: 'sent'
                });

                this.newMessage = '';

                // close all menus
                this.openMenu();

                setTimeout(this.replyMessage, 1000, this.activeChat);

            }
        },

        replyMessage: function (index) {
            this.contacts[index].messages.push({
                date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                message: 'Ok',
                status: 'received'
            });
        },

        filterList: function(element) {

            if (this.filterValue == '') {

                return true;
                
            } else {

                const lowElName = element.name.toLowerCase();
                const lowFilter = this.filterValue.toLowerCase();

                return lowElName.includes(lowFilter);

            }

        },

        filterMessageList: function(messText) {

            if (this.filterMessage == '') {

                return true;
                
            } else {

                const lowMess = messText.toLowerCase();
                const lowFilter = this.filterMessage.toLowerCase();

                return lowMess.includes(lowFilter);

            }
            
        },

        openMenu: function(menuName) {
            
            switch (menuName) {
                case 'option-menu-l':
                    this.menuOptionL = !this.menuOptionL;
                    this.menuOptionR = false;
                    this.clipMenu = false;
                    if (this.filterMessage == '') {
                        this.messageSearch = false;
                    }
                    break;

                case 'option-menu-r':
                    this.menuOptionL = false;
                    this.menuOptionR = !this.menuOptionR;
                    this.clipMenu = false;
                    if (this.filterMessage == '') {
                        this.messageSearch = false;
                    }
                    break;

                case 'clip-menu':
                    this.menuOptionL = false;
                    this.menuOptionR = false;
                    this.clipMenu = !this.clipMenu;
                    if (this.filterMessage == '') {
                        this.messageSearch = false;
                    }
                    break;

                case 'search':
                    this.menuOptionL = false;
                    this.menuOptionR = false;
                    this.clipMenu = false;
                    this.messageSearch = !this.messageSearch;
                    this.filterMessage = "";
                    break;

                default:
                    this.menuOptionL = false;
                    this.menuOptionR = false;
                    this.clipMenu = false;
                    this.messageSearch = false;
                    this.filterMessage = '';
            }

        }

    }

});