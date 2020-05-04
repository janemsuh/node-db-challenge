exports.up = async function(knex) {
    await knex.schema.createTable('projects', tbl => {
        tbl.increments('id')
        tbl.text('name').notNull()
        tbl.text('description')
        tbl.boolean('completed').defaultTo(false)
    })

    await knex.schema.createTable('tasks', tbl => {
        tbl.increments('id')
        tbl.text('description').notNull()
        tbl.text('notes')
        tbl.boolean('completed').defaultTo(false)
        tbl.integer('project_id')
            .unsigned()
            .notNull()
            .references('id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })

    await knex.schema.createTable('resources', tbl => {
        tbl.increments('id')
        tbl.text('name').notNull().unique()
        tbl.text('description')
    })

    await knex.schema.createTable('project_resources', tbl => {
        tbl.integer('project_id')
            .references('id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.integer('resource_id')
            .references('id')
            .inTable('resources')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.primary(['project_id', 'resource_id'])
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('resources')
    await knex.schema.dropTableIfExists('tasks')
    await knex.schema.dropTableIfExists('projects')
};
