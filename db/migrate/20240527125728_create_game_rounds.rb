# frozen_string_literal: true

class CreateGameRounds < ActiveRecord::Migration[7.0]
  def change
    create_table :game_rounds do |t|
      t.string :choice
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
