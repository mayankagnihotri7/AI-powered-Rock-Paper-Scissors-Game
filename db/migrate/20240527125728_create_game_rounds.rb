# frozen_string_literal: true

class CreateGameRounds < ActiveRecord::Migration[7.0]
  def change
    create_table :game_rounds do |t|
      t.string :choice
      t.string :ai_choice
      t.string :result

      t.timestamps
    end
  end
end
