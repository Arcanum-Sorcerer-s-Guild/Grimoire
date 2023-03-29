import React, { useEffect, useState } from "react";
import { Spinner, Button } from "flowbite-react";
import { useParams, useNavigate } from "react-router-dom";
import { mslContext } from "../App.js";

const SingleTemplate = () => {
  const { srvPort, templateValues, setTemplateValues } =
    React.useContext(mslContext);
  const [template, setTemplate] = useState();
  const navigate = useNavigate();
  let params = useParams();


  const selectTemplate = () => {
;
    setTemplateValues({
      title: template.form_data.title,
      description: template.form_data.description,
    });
    navigate("/post");
  };

  useEffect(() => {
    fetch(`http://localhost:${srvPort}/templates/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTemplate(data[0]);
      });
  }, []);

  return (
    <>
      <section className="col-span-2 place-items-center max-h-fit w-full mb-5 mt-20">
        <div className="px-9">
          {template ? (
            <>
              <div class="overflow-hidden bg-slate-200 dark:bg-blue-900 shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-base font-semibold leading-6 text-amber-600">
                    {`Template ID#${template.id}`}
                  </h3>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-white">
                    A template just for you!
                  </p>
                </div>
                <div class="border-t border-gray-200"></div>
                <dl>
                  <div class="bg-gray-50 dark:bg-gray-600 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500  dark:text-white">Title</dt>
                    <dd class="mt-1 text-sm text-gray-900  dark:text-white sm:col-span-2 sm:mt-0">
                      {`${template.form_data.title}`}
                    </dd>
                  </div>
                  <div class="border-t border-gray-200"></div>
                  <div class="bg-gray-50 dark:bg-gray-600 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500  dark:text-white">
                      Description
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900  dark:text-white sm:col-span-2 sm:mt-0">
                    {`${template.form_data.description}`}
                    </dd>
                  </div>
                  <div>
                    <dd>
                      <ul></ul>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex justify-center pt-10">
                {" "}
                <Button 
                  className="bg-slate-800 dark:bg-slate-500"
                  onClick={() => selectTemplate()}
                >
                  Use Template
                </Button>{" "}
              </div>
            </>
          ) : (
            <Spinner aria-label="Extra large spinner example" size="xl" />
          )}
        </div>
      </section>
    </>
  );
};

export default SingleTemplate;
