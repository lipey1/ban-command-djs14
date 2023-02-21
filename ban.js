const Discord = require('discord.js')
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const { ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bane um usuário do servidor.',
    permission: 'BanMembers',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuário',
            type: ApplicationCommandOptionType.User,
            description: '[Administrador] Usuário a ser banido.',
            required: true
        },
    ],


    run: async (client, interaction) => {

        let color =  '#2f3136'

        const user = interaction.options.getUser('usuário')

        const embeduser_userban = new Discord.EmbedBuilder()
            .setDescription(`❌  *Você não pode se banir*`)
            .setColor('#FF0000')

        if (interaction.user.id === user.id) return interaction.reply({ embeds: [embeduser_userban], ephemeral: true })

        const member = interaction.guild.members.cache.get(user.id)

        const embednomember = new Discord.EmbedBuilder()
            .setDescription(`❌  *O usuário não existe`)
            .setColor('#FF0000')

        if (!member) return interaction.reply({ embeds: [embednomember], ephemeral: true })

        const emebdrolemax = new Discord.EmbedBuilder()
            .setDescription(`❌  *O seu cargo é menor ou igual que o do usuário*`)
            .setColor('#FF0000')

        if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ embeds: [emebdrolemax], ephemeral: true })

        const emebdbotrolemax = new Discord.EmbedBuilder()
            .setDescription(`❌  *O meu cargo é menor ou igual que o do usuário*`)
            .setColor('#FF0000')

        if (interaction.guild.members.me.roles.highest.position <= member.roles.highest.position) return interaction.reply({ embeds: [emebdbotrolemax], ephemeral: true })

        let embed_ban = new Discord.EmbedBuilder()
            .setDescription(`\`\`\`BANIMENTO\`\`\`\n**Usuário selecionado:** ${member.user.tag}\n\n*Para punir algum usuário use o menu abaixo e forneça o motivo, caso o motivo não esteja pré-definido use a última opção do menu*`)
            .setColor(color)

        const selectmenu_ban = new Discord.ActionRowBuilder().addComponents([
            new Discord.StringSelectMenuBuilder()
                .setCustomId('ban_menu')
                .setPlaceholder('Motivo do banimento 🔨')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: `🗣️ Racismo, preconceito ou xenofobia`,
                        description: `Clique aqui selecionar o motivo...`,
                        value: 'ban_1'
                    },
                    {
                        label: `✏️ Desrespeito ou ofensa`,
                        description: `Clique aqui selecionar o motivo...`,
                        value: 'ban_2'
                    },
                    {
                        label: `📢 Descumprimento das regras`,
                        description: `Clique aqui selecionar o motivo...`,
                        value: 'ban_3'
                    },
                    {
                        label: `📝 Outro motivo`,
                        description: `Clique aqui selecionar outro motivo...`,
                        value: 'ban_4'
                    },
                ])
        ])

        let msg = await interaction.reply({ embeds: [embed_ban], components: [selectmenu_ban], ephemeral: true })

        const coletor = await msg.createMessageComponentCollector({
            filter: i => ['ban_menu'].includes(i.customId) && i.user.id === interaction.user.id
        });

        coletor.on('collect', async i => {

            interaction.editReply({ components: [selectmenu_ban], ephemeral: true })

            let option = i.values[0]

            switch (option) {

                case 'ban_1':

                    if (option === 'ban_1') {

                        let reason = 'Racismo, preconceito ou xenofobia'

                        try {
                            let embed_banned_dm = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setDescription(`\`\`\`BANIMENTO\`\`\`\n*Você foi banido do servidor **${interaction.guild.name}***\n\n***Motivo:** ${reason}*`)
                            user.send({ embeds: [embed_banned_dm] })
                        } catch {
                        }

                        let ban = await interaction.guild.members.ban(user, { reason }).then(() => {
                            let embed_banned = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setDescription(`\`\`\`BANIMENTO\`\`\`\n*O usuário **${member.user.tag}** foi banido*\n\n***Motivo:** ${reason}*`)

                            let msg = i.reply({ embeds: [embed_banned], ephemeral: true })

                        }).catch(() => {
                            const embederror = new Discord.EmbedBuilder()
                                .setDescription(`❌  *Não foi possível banir o usuário*`)
                                .setColor('#FF0000')

                            return interaction.reply({ embeds: [embederror], ephemeral: true })
                        });

                    }

                    break;

                case 'ban_2':

                    if (option === 'ban_2') {

                        let reason = 'Desrespeito ou ofensa'

                        try {
                            let embed_banned_dm = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setDescription(`\`\`\`BANIMENTO\`\`\`\n*Você foi banido do servidor **${interaction.guild.name}***\n\n**Motivo:** ${reason}*`)
                            user.send({ embeds: [embed_banned_dm] })
                        } catch {
                        }

                        let ban = await interaction.guild.members.ban(user, { reason }).then(() => {
                            let embed_banned = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setDescription(`\`\`\`BANIMENTO\`\`\`\n*O usuário **${member.user.tag}** foi banido*\n\n***Motivo:** ${reason}*`)

                            let msg = i.reply({ embeds: [embed_banned], ephemeral: true })

                        }).catch(() => {
                            const embederror = new Discord.EmbedBuilder()
                                .setDescription(`❌  *Não foi possível banir o usuário*`)
                                .setColor('#FF0000')

                            return interaction.reply({ embeds: [embederror], ephemeral: true })
                        });

                    }

                    break;

                case 'ban_3':

                    if (option === 'ban_3') {

                        let reason = 'Descumprimento das regras'

                        try {
                            let embed_banned_dm = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setDescription(`\`\`\`BANIMENTO\`\`\`\n*Você foi banido do servidor **${interaction.guild.name}***\n\n***Motivo:** ${reason}*`)
                            user.send({ embeds: [embed_banned_dm] })
                        } catch {
                        }

                        let ban = await interaction.guild.members.ban(user, { reason }).then(() => {
                            let embed_banned = new Discord.EmbedBuilder()
                                .setColor(color)
                                .setDescription(`\`\`\`BANIMENTO\`\`\`\n*O usuário **${member.user.tag}** foi banido*\n\n***Motivo:** ${reason}*`)

                            let msg = i.reply({ embeds: [embed_banned], ephemeral: true })

                        }).catch(() => {
                            const embederror = new Discord.EmbedBuilder()
                                .setDescription(`❌  *Não foi possível banir o usuário*`)
                                .setColor('#FF0000')

                            return interaction.reply({ embeds: [embederror], ephemeral: true })
                        });

                    }

                    break;

                case 'ban_4':

                    if (option === 'ban_4') {

                        // Código para diferenciar os Modals
                        let code = Date.now().toString()


                        // Modal
                        const criarModal = async (interaction, message) => {

                            const inputs = [];

                            let modal = new ModalBuilder()
                                .setCustomId('motivo')
                                .setTitle('Motivo do banimento');

                            const banInput = new TextInputBuilder()
                                .setCustomId(`motivo_ban${code}`)
                                .setLabel(`Motivo do banimento do usuário`)
                                .setMaxLength(50)
                                .setRequired(true)
                                .setStyle(TextInputStyle.Short);

                            inputs.push(
                                new Discord.ActionRowBuilder()
                                    .addComponents(banInput)
                            );

                            modal.addComponents(inputs);

                            interaction.showModal(modal)

                            try {

                                return await interaction.awaitModalSubmit({
                                    filter: i => i.user.id === interaction.user.id,
                                    time: 900000,
                                });

                            } catch {

                            }

                        }

                        // Coletar Modal
                        const modalInteraction = await criarModal(i, i)

                        try {

                            if (modalInteraction.isModalSubmit()) {


                                const reason = await modalInteraction.fields.getTextInputValue(`motivo_ban${code}`)

                                try {
                                    let embed_banned_dm = new Discord.EmbedBuilder()
                                        .setColor(color)
                                        .setDescription(`\`\`\`BANIMENTO\`\`\`\n*Você foi banido do servidor **${interaction.guild.name}***\n\n***Motivo:** ${reason}*`)
                                    user.send({ embeds: [embed_banned_dm] })
                                } catch {
                                }

                                let ban = await interaction.guild.members.ban(user, { reason }).then(() => {
                                    let embed_banned = new Discord.EmbedBuilder()
                                        .setColor(color)
                                        .setDescription(`\`\`\`BANIMENTO\`\`\`\n*O usuário **${member.user.tag}** foi banido*\n\n***Motivo:** ${reason}*`)

                                    let msg = modalInteraction.reply({ embeds: [embed_banned], ephemeral: true })

                                }).catch(() => {
                                    const embederror = new Discord.EmbedBuilder()
                                        .setDescription(`❌  *Não foi possível banir o usuário*`)
                                        .setColor('#FF0000')

                                    return interaction.reply({ embeds: [embederror], ephemeral: true })
                                });

                            }

                        } catch {

                        }
                    }
            }
        })







    }
}
