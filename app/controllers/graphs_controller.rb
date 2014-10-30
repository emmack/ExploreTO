class GraphsController < ApplicationController

	def new
		@graph = Graph.new
	end

	def create
		@graph = Graph.new(graph_params)
			if @graph.save
				respond_to do |format|
					format.js
				end
			else
				render :new
			end
	end


	def show
		@graph = Graph.find(params[:id])
	end
	

	private
  	def graph_params
  	 	params.require(:graph).permit( :var1_id, :var2_id)
  	end
end

