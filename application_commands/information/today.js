const Discord = require('discord.js');
const axios = require('axios')
module.exports = {
  name: "today",
  description: "What happened *today*?",
  run: async(client, interaction, args) => {

    axios.get('http://history.muffinlabs.com/date').then(res => {
        const events = res.data.data.Events;
        const event = events[Math.floor(Math.random() * events.length)];
        const embed = new Discord.MessageEmbed()
            .setURL(res.url)
            .setTitle(`On this day (${res.data.date})...`)
            .setTimestamp()
            .setDescription(`${event.year}: ${event.text}`)
            .setFooter('Tekno', client.user.displayAvatarURL())
			.setColor('#2f3136')
        return interaction.reply({embeds: [embed]})

  })
  }}